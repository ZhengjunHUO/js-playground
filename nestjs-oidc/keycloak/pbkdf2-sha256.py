import os, sys, base64, hashlib

ITER=27500
password = b"aintsecure"
#salt = os.urandom(16)
salt = base64.b64decode("x+jKkFz/TTuD+DKiZkNzSg==")
dk = hashlib.pbkdf2_hmac('sha256', password, salt, ITER, dklen=64)
# store as: pbkdf2_sha256$iterations$base64(salt)$base64(dk)
print(f"pbkdf2_sha256${ITER}${base64.b64encode(salt).decode()}${base64.b64encode(dk).decode()}")
