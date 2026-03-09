import cv2
import pandas as pd
import numpy as np
from ultralytics import YOLO
from tracker import *

# Load YOLO model
model = YOLO('yolov8s.pt')

# Mouse coordinate viewer (for selecting polygon points)
def RGB(event, x, y, flags, param):
    if event == cv2.EVENT_MOUSEMOVE:
        print([x, y])

cv2.namedWindow('RGB')
cv2.setMouseCallback('RGB', RGB)

# Video input
cap = cv2.VideoCapture('finalvehicle.mp4')

# Load COCO class list
my_file = open("coco.txt", "r")
data = my_file.read()
class_list = data.split("\n")

# Initialize tracker
tracker = Tracker()

# Define ROAD REGION (adjust if needed)
road_region = [(140,120), (1000,120), (1010,410), (120,165)]

# Store vehicles currently inside region
vehicles_inside = set()

while True:

    ret, frame = cap.read()
    if not ret:
        break

    # Resize frame
    frame = cv2.resize(frame,(1020,500))

    # YOLO Detection
    results = model.predict(frame)

    a = results[0].boxes.data
    px = pd.DataFrame(a).astype("float")

    list = []

    for index,row in px.iterrows():

        x1 = int(row[0])
        y1 = int(row[1])
        x2 = int(row[2])
        y2 = int(row[3])
        d  = int(row[5])

        c = class_list[d]

        # Detect only vehicles
        if c in ['car','truck','bus','motorbike','bicycle']:
            list.append([x1,y1,x2,y2])

    # Tracking
    bbox_idx = tracker.update(list)

    # IDs detected in region this frame
    current_ids = set()

    for bbox in bbox_idx:

        x3,y3,x4,y4,id = bbox

        # Center point
        cx = int(x3+x4)//2
        cy = int(y3+y4)//2

        # Check if inside polygon
        inside = cv2.pointPolygonTest(np.array(road_region,np.int32),(cx,cy),False)

        if inside >= 0:

            current_ids.add(id)

            cv2.rectangle(frame,(x3,y3),(x4,y4),(0,255,0),2)

            cv2.putText(frame,str(id),(x3,y3),
                        cv2.FONT_HERSHEY_COMPLEX,0.6,(255,0,0),2)

            cv2.circle(frame,(cx,cy),4,(0,0,255),-1)

    # Update vehicles currently inside
    vehicles_inside = current_ids

    # Current vehicle count
    count = len(vehicles_inside)

    # Display count
    cv2.putText(frame,"Vehicle Count: "+str(count),(30,50),
                cv2.FONT_HERSHEY_SIMPLEX,1,(255,255,255),2)

    # Draw road polygon
    cv2.polylines(frame,[np.array(road_region,np.int32)],True,(255,0,0),3)

    # Show frame
    cv2.imshow("RGB",frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()