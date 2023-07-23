import io

with open("CSW21.txt", "r") as file:
    wordListCSW21 = set(file.read().split("\n"))

with open("NWL2020.txt", "r") as file:
    wordListNWL2020 = set(file.read().split("\n"))

word = input("Enter a word: ")

belongsToCSW21 = word in wordListCSW21
belongsToNWL2020 = word in wordListNWL2020

if belongsToCSW21:
    print(f"{word} belongs to CSW21 word list.")

if belongsToNWL2020:
    print(f"{word} belongs to NWL2020 word list.")

if not belongsToCSW21 and not belongsToNWL2020:
    print(f"{word} does not belong to either word list.")

wordListInCSW21OutNWL2020 = sorted(set(wordListCSW21) - set(wordListNWL2020))
with open("wordListInCSW21OutNWL2020.txt", "w") as file:
    for word in wordListInCSW21OutNWL2020:
        file.write(word + "\n")

wordListInNWL2020OutCSW21 = sorted(set(wordListNWL2020) - set(wordListCSW21))
with open("wordListInNWL2020OutCSW21.txt", "w") as file:
    for word in wordListInNWL2020OutCSW21:
        file.write(word + "\n")
