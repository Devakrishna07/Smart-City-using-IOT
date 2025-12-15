import cv2 as cv 
import numpy as np 
import matplotlib as plt

cap = cv.VideoCapture(0)

while True :
    ret,frame = cap.read()

    if not ret:
        print('cannot connect')
        break
    cv.imshow('video',frame)
    
    if cv.waitKey(1) == ord('s'):
        break

cv.destroyAllwindows()
    