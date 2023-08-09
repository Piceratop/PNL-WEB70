from faker import Faker

fake = Faker()

users = []

for _ in range(1):  # Generate 10 users
    user = {
        "username": fake.user_name(),
        "age": fake.random_int(min=18, max=80),
        "email": fake.email(),
        "password": fake.password()
    }
    users.append(user)

print(str(users).replace("'", "\""))