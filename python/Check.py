import cv2
from pyzbar.pyzbar import decode

# Open the webcam
cap = cv2.VideoCapture(0)  # 0 is the default camera

while True:
    ret, frame = cap.read()  # Read a frame from the webcam
    if not ret:
        print("Failed to grab frame")
        break

    # Decode QR codes from the frame
    decoded_objects = decode(frame)

    for obj in decoded_objects:
        qr_data = obj.data.decode("utf-8")  # Extract QR code data
        print("Scanned QR Code Data:", qr_data)
        print("Invalid QR Code")  # Marking it invalid
        
        # Draw a rectangle around the QR code
        points = obj.polygon
        if len(points) == 4:
            pts = [(point.x, point.y) for point in points]
            cv2.polylines(frame, [np.array(pts, dtype=np.int32)], True, (0, 255, 0), 2)

    # Display the camera feed
    cv2.imshow("QR Code Scanner", frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close OpenCV windows
cap.release()
cv2.destroyAllWindows()
