import sys, importlib, pkgutil
print("exe:", sys.executable)
print("cwd:", __file__)
print("site:", [p for p in sys.path if "site-packages" in p])

print("models loader?", bool(pkgutil.find_loader("face_recognition_models")))
m = importlib.import_module("face_recognition_models")
print("models file:", m.__file__)
print("models dir:", m.face_recognition_models_location())

fr = importlib.import_module("face_recognition")
print("face_recognition file:", fr.__file__)
