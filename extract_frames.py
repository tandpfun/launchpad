import cv2
import os
import sys

# Extract frames from video (one every 15 frames)
video_path = "images/video.mp4"
output_dir = "images/frames"

# Allow video path and output dir to be passed as arguments
if len(sys.argv) > 1:
    video_path = sys.argv[1]
if len(sys.argv) > 2:
    output_dir = sys.argv[2]

os.makedirs(output_dir, exist_ok=True)

print(f"Extracting frames from {video_path}...")
cap = cv2.VideoCapture(video_path)
frame_count = 0
extracted_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Extract every 15th frame
    if frame_count % 15 == 0:
        frame_filename = os.path.join(output_dir, f"frame_{extracted_count:05d}.jpg")
        cv2.imwrite(frame_filename, frame)
        extracted_count += 1
        print(f"Extracted frame {extracted_count} (original frame {frame_count})")
    
    frame_count += 1

cap.release()
print(f"\nExtracted {extracted_count} frames from {frame_count} total frames")
print(f"Frames saved to {output_dir}/")

