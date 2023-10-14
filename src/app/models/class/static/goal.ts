import { DataDescription, Options } from "../../interface/masterData.model";

export class GoalData {
  public static goalType:Options[]=[
    {
      title:'Daily',
      value:'Daily'
    },
    {
      title:'Tomorrow',
      value:'Tomorrow'
    },
    {
      title:'Short Term',
      value:'Short Term'
    },
    {
      title:'Long Term',
      value:'Long Term'
    }
  ]

  public static goalFor:Options[]=[
    { title: 'Adventure', value: 'Adventure' },
    { title: 'Business', value: 'Business' },
    { title: 'Career', value: 'Career' },
    { title: 'Contribution', value: 'Contribution' },
    { title: 'Creativity', value: 'Creativity' },
    { title: 'Discipline', value: 'Discipline' },
    { title: 'Donation', value: 'Donation' },
    { title: 'Education', value: 'Education' },
    { title: 'Emotional Well-being', value: 'Emotional Well-being' },
    { title: 'Environment', value: 'Environment' },
    { title: 'Finance', value: 'Finance' },
    { title: 'Health', value: 'Health' },
    { title: 'Home', value: 'Home' },
    { title: 'Language Learning', value: 'Language Learning' },
    { title: 'Organization', value: 'Organization' },
    { title: 'Personal Development', value: 'Personal Development' },
    { title: 'Productivity', value: 'Productivity' },
    { title: 'Relationship', value: 'Relationship' },
    { title: 'Social Connections', value: 'Social Connections' },
    { title: 'Skills Development', value: 'Skills Development' },
    { title: 'Spirituality', value: 'Spirituality' },
    { title: 'Sport', value: 'Sport' },
    { title: 'Studies', value: 'Studies' },
    { title: 'Time Management', value: 'Time Management' },
    { title: 'Travel', value: 'Travel' },
    { title: 'Well-being', value: 'Well-being' },
    { title: 'Work', value: 'Work' }
  ]

  public static goalDetails:DataDescription[]=[
    {
      title: 'Adventure',
      description: 'Embrace exciting and daring experiences, explore the unknown, and seek thrilling journeys that push your boundaries.'
    },
    {
      title: 'Business',
      description: 'Focus on entrepreneurial endeavors, managing and growing enterprises, and creating value in the corporate world.'
    },
    {
      title: 'Career',
      description: 'Set goals and work towards advancing your profession, achieving success, and finding fulfillment in your chosen vocation.'
    },
    {
      title: 'Contribution',
      description: 'Make a positive impact by actively giving back to society, volunteering, and supporting meaningful causes.'
    },
    {
      title: 'Creativity',
      description: 'Express your imagination and originality through various artistic forms, unleashing your innovative and inventive potential.'
    },
    {
      title: 'Discipline',
      description: 'Cultivate self-control, adhere to structured routines, and stay committed to achieving your goals through focused effort.'
    },
    {
      title: 'Donation',
      description: 'Generously give resources, money, or time to support charitable organizations and make a difference in the lives of others.'
    },
    {
      title: 'Education',
      description: 'Pursue knowledge and intellectual growth through formal learning, gaining expertise, and expanding your understanding.'
    },
    {
      title: 'Emotional Well-being',
      description: 'Nurture your emotional health by cultivating self-awareness, managing stress, and fostering positive emotions and relationships.'
    },
    {
      title: 'Environment',
      description: 'Promote sustainability, protect nature, and actively engage in preserving and conserving the environment for future generations.'
    },
    {
      title: 'Finance',
      description: 'Manage and grow your financial resources, make sound investment decisions, and attain long-term financial stability.'
    },
    {
      title: 'Health',
      description: 'Prioritize your physical well-being by adopting a balanced lifestyle, exercising regularly, and maintaining good health habits.'
    },
    {
      title: 'Home',
      description: 'Create a comfortable, harmonious living space that reflects your personal style and provides a sanctuary for relaxation and joy.'
    },
    {
      title: 'Language Learning',
      description: 'Expand your horizons by acquiring proficiency in a new language, embracing cultural diversity, and enhancing communication skills.'
    },
    {
      title: 'Organization',
      description: 'Bring order and structure to your life, de-clutter your surroundings, and develop efficient systems for increased productivity.'
    },
    {
      title: 'Personal Development',
      description: 'Continuously grow and improve as an individual, explore self-discovery, and unleash your full potential for personal fulfillment.'
    },
    {
      title: 'Productivity',
      description: 'Optimize your efficiency, manage time effectively, and achieve more by focusing on high-value tasks and eliminating distractions.'
    },
    {
      title: 'Relationship',
      description: 'Cultivate meaningful connections, build trust, and foster healthy interactions with others based on mutual respect and understanding. Nurture and strengthen bonds with family, friends, and loved ones through open communication, empathy, and quality time together'
    },
    {
      title: 'Social Connections',
      description: 'Build and foster a network of diverse social connections, engage in meaningful interactions, and create a sense of belonging.'
    },
    {
      title: 'Skills Development',
      description: 'Enhance your abilities and acquire new skills through continuous learning, practice, and seeking opportunities for personal growth.'
    },
    {
      title: 'Spirituality',
      description: 'Explore and connect with your inner self, seek meaning and purpose, and develop a deeper connection with the divine or higher power.'
    },
    {
      title: 'Sport',
      description: 'Engage in physical activities, sports, and exercises that promote fitness, competition, teamwork, and personal well-being.'
    },
    {
      title: 'Time Management',
      description: 'Effectively utilize and manage your time, prioritize tasks, and make the most of each day for increased productivity and fulfillment.'
    },
    {
      title: 'Travel',
      description: 'Embark on new adventures, explore different cultures and destinations, and broaden your horizons through enriching travel experiences.'
    },
    {
      title: 'Well-being',
      description: 'Take care of your overall well-being, focusing on physical, mental, and emotional health, and nurturing a balanced lifestyle.'
    }
  ]

  public static goalSetting:DataDescription[] =[
    {
      title: 'Goal Term',
      description: 'Select goal term or target duration, like daily goal, tomorrow, short term or long term.Set a target date accordingly.'
    },
    {
      title: 'Goal Category',
      description: 'Select a category or domain for your goal, such as personal development, career, health, relationships, etc.'
    },
    {
      title: 'Goal Description',
      description: 'Describe your goal in detail, including what you want to achieve and why it is important to you.'
    },
    {
      title: 'Specificity',
      description: 'Make your goal more specific by defining measurable outcomes, setting deadlines, or identifying key milestones.'
    },
    {
      title: 'Action Steps',
      description: 'Outline the specific action steps or tasks you need to take to work towards your goal.'
    },
    {
      title: 'Resources Needed',
      description: 'Identify any resources you require to achieve your goal, such as time, money, tools, or support from others.'
    },
    {
      title: 'Potential Obstacles',
      description: 'Anticipate potential obstacles or challenges you might face while pursuing your goal.'
    },
    {
      title: 'Strategies and Solutions',
      description: 'Brainstorm and document strategies you can employ to overcome obstacles and find solutions to challenges.'
    },
    {
      title: 'Timeline',
      description: 'Set a timeline or target date for achieving your goal, establishing a sense of urgency and accountability.'
    },
    {
      title: 'Progress Tracking',
      description: 'Track your progress towards your goal using a checklist, milestones, or a progress bar.'
    },
    {
      title: 'Motivation and Rewards',
      description: 'Identify your motivation for achieving the goal and determine any rewards or incentives you can give yourself upon successful completion.'
    }
  ]

}
