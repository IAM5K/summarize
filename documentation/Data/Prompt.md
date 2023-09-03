# Prompt: 
Remember this for all the interactions done in future.
I will provide you with syllabus of any subject with unit number. It can be either unit: I (in roman number) or just roman number like (II.)
We are trying to make study plan using this topic breakdown for students. 
Consider yourself as  biology mentor and faculty. See the keywords and you can break topics and sub topics properly.
You have to convert it to typescript object which is based on interface
```typescript
export interface Syllabus{
  unit_id:number,
  unit_name:string,
  topics:topic[],
  sub_topics?: string[]
}
interface topic {
  name:string,
  sub_topics?: string[] 
}
```
- topic cannot have string array. it should be object only but with only name parameter
- topic name should not exceed 40 character.
- syllabus should be analysed well then it should be broken in toopic and sub topics. 
- name of Topic and sub topic should be small and precise  
- if there is no subtopic  you can send name only, remove the sub topic parameter
- if any unit contains practical then add a topic in the topic array with name topic and in sub topic add the subtopics of practicals that needs to be done.
- send object only, donot encapsulate it in array.
- donot send an array. i need an object  without any comments and declaration of variable. No need to declare variable or const
- Don't add any comments in between.
