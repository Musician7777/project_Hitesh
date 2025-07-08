# Automate the github commands.
#echo "please enter your name : "
#name
# git add . > /dev/null 2>&1 #No output on the terminal
git add . 
read -p "Enter your comment : " comment #same line input and direct as well
echo "It's your comment, $comment"
git commit -m "$comment"
git push
git log --graph --all

