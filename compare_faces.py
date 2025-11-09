from deepface import DeepFace
import os
import sys
import json

# Get directory from command line argument
if len(sys.argv) < 2:
    print("Usage: python compare_faces.py <directory>")
    print("Example: python compare_faces.py images/frames")
    sys.exit(1)

output_dir = sys.argv[1]

# Extract face from reference image
reference_path = os.path.join(output_dir, "reference.jpg")
if not os.path.exists(reference_path):
    print(f"\nError: {reference_path} not found. Please add reference.png to {output_dir}/")
    sys.exit(1)

print(f"\nExtracting faces from reference image...")
reference_faces = DeepFace.extract_faces(
    img_path=reference_path,
    detector_backend="retinaface"
)
print(f"Found {len(reference_faces)} face(s) in reference image")

if not reference_faces:
    print("No face detected in reference image!")
    sys.exit(1)

# Extract all reference faces
reference_face_arrays = [face["face"] for face in reference_faces]

# Verify reference against each extracted frame
print(f"\nVerifying reference against extracted frames in {output_dir}...")
frame_files = sorted([f for f in os.listdir(output_dir) if f.startswith("frame_") and f.endswith(".jpg")])

if not frame_files:
    print(f"No frame files found in {output_dir}")
    sys.exit(1)

print(f"Found {len(frame_files)} frame files to process\n")

# Store all results
results = {
    "reference_image": reference_path,
    "reference_faces_count": len(reference_face_arrays),
    "frames": []
}

for frame_file in frame_files:
    frame_path = os.path.join(output_dir, frame_file)
    print(f"Processing {frame_file}...")
    
    try:
        frame_faces = DeepFace.extract_faces(
            img_path=frame_path,
            detector_backend="retinaface"
        )
        
        if frame_faces:
            frame_face_arrays = [face["face"] for face in frame_faces]
            print(f"  Found {len(frame_face_arrays)} face(s) in frame")
            
            frame_results = {
                "frame_file": frame_file,
                "faces_detected": len(frame_face_arrays),
                "comparisons": []
            }
            
            # Compare each reference face with each frame face
            for ref_idx, ref_face in enumerate(reference_face_arrays):
                for frame_idx, frame_face in enumerate(frame_face_arrays):
                    result = DeepFace.verify(
                        img1_path=ref_face,
                        img2_path=frame_face,
                        detector_backend="skip"
                    )
                    print(f"    Ref face {ref_idx+1} vs Frame face {frame_idx+1}: Match={result['verified']}, Distance={result['distance']:.4f}, Threshold={result['threshold']:.4f}")
                    
                    frame_results["comparisons"].append({
                        "reference_face_index": ref_idx + 1,
                        "frame_face_index": frame_idx + 1,
                        "verified": result['verified'],
                        "distance": result['distance'],
                        "threshold": result['threshold']
                    })
            
            results["frames"].append(frame_results)
        else:
            print(f"  No face detected in {frame_file}")
            results["frames"].append({
                "frame_file": frame_file,
                "faces_detected": 0,
                "comparisons": []
            })
    except Exception as e:
        print(f"  Error processing {frame_file}: {e}")
        results["frames"].append({
            "frame_file": frame_file,
            "error": str(e),
            "comparisons": []
        })

# Save results to JSON
json_output_path = os.path.join(output_dir, "comparison_results.json")
with open(json_output_path, 'w') as f:
    json.dump(results, f, indent=2)

print(f"\nResults saved to {json_output_path}")

