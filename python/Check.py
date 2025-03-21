import cv2
import numpy as np
import json
import time
from pyzbar.pyzbar import decode

# Open the webcam
cap = cv2.VideoCapture(0)

scanned_qrs = set()  # Store already scanned QR codes
last_scan_time = 0  # Store time of last scan

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame")
        break

    decoded_objects = decode(frame)

    for obj in decoded_objects:
        qr_data = obj.data.decode("utf-8")  # Extract QR data

        # Prevent repeated scanning within 2 seconds
        if time.time() - last_scan_time < 2:
            continue

        last_scan_time = time.time()

        print("Scanned QR Code Data:", qr_data)

        # Validate QR Code
        try:
            qr_json = json.loads(qr_data)  # Parse JSON
            if "bookingId" in qr_json:
                booking_id = qr_json["bookingId"]
                
                if booking_id in scanned_qrs:
                    print("❌ Invalid QR Code (Already Used!)")
                else:
                    print(f"✅ Valid QR Code: Booking ID = {booking_id}")
                    scanned_qrs.add(booking_id)  # Store used QR

            else:
                print("❌ Invalid QR Code (Missing bookingId)")
        except json.JSONDecodeError:
            print("❌ Invalid QR Code (Not a valid JSON)")

        # Draw a rectangle around QR code
        pts = [(point.x, point.y) for point in obj.polygon]
        cv2.polylines(frame, [np.array(pts, dtype=np.int32)], True, (0, 255, 0), 2)

    # Show camera feed
    cv2.imshow("QR Code Scanner", frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
