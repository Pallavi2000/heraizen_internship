"""Program to """

reward_point=int(input("Enter your reward point : "))

if reward_point<=1000 and reward_point>=0:
    m_type="Silver"
elif reward_point>1000 and reward_point<=10000:
    m_type="Gold"
else:
    m_type="Platinum"

print(f"Welcome {m_type} card holder")
