from deepface import DeepFace

# Step 1: Extract faces from both images
print("Extracting faces from image 1...")
faces1 = DeepFace.extract_faces(
    img_path="images/real-3.png",
    detector_backend="retinaface"
)
print(f"Found {len(faces1)} face(s) in image 1")

print("Extracting faces from image 2...")
faces2 = DeepFace.extract_faces(
    img_path="images/teddy.png",
    detector_backend="retinaface"
)
print(f"Found {len(faces2)} face(s) in image 2")

# Step 2: Verify the extracted faces
print("\nVerifying faces...")
result = DeepFace.verify(
    img1_path=faces1[0]["face"],
    img2_path=faces2[0]["face"],
    detector_backend="skip"
)

print("\nVerification result:")
print(result)