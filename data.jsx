// Shared TEK data — parsed from the uploaded markdown file.
// All four template variations read from this so we can see the same
// content rendered four different ways.

const TEK_DATA = {
  code: '110.36(1)(B)',
  course: 'English I',
  courseCode: '110.36',
  strand: 'Foundational Language Skills',
  substrand: 'Oral Language',
  title: 'Follow and give complex oral instructions',
  standard:
    'Developing and sustaining foundational language skills: listening, discussion, and thinking — oral language.',
  expectation:
    'Follow and give complex oral instructions to perform specific tasks, answer questions, or solve problems and complex processes.',
  overview:
    'The student develops oral language through listening, discussion, speaking, and thinking, with an emphasis on following and giving complex oral instructions.',
  studentFriendly:
    'You can listen carefully and understand when someone gives you detailed instructions on how to do something — like completing a task or solving a problem. You can also answer questions and work through more complicated things.',
  tags: ['Listening', 'Discussion', 'Oral Language', 'Instruction'],
  // Suggested metadata I'm recommending you add (flagged in rationale):
  dok: 3, // Depth of Knowledge — Strategic Thinking
  bloom: 'Apply / Analyze',
  verticalPrev: '110.35(1)(B) · English I (Grade 8)',
  verticalNext: '110.37(1)(B) · English II',
  related: ['110.36(1)(A)', '110.36(1)(C)', '110.36(1)(D)'],
  estimatedTime: 'Ongoing · embed in daily routines',

  questionStems: [
    'Can you explain the steps involved in performing a specific task?',
    'How would you solve a complex problem or process?',
    'Can you provide an example of a complex process and explain each step involved?',
    'What instructions would you give to someone to complete a specific task?',
    'How would you answer a complex question that requires multiple steps to arrive at the solution?',
    'Can you describe a time when you had to follow complex oral instructions to complete a task or solve a problem?',
    'What strategies do you use to understand and remember complex oral instructions?',
    'How do you approach complex processes or tasks that require multiple steps to complete?',
    'Can you explain a time when you had to give complex oral instructions to someone else?',
    'How do you ensure that you accurately follow complex oral instructions without missing any steps?',
  ],

  misconceptions: [
    {
      title: 'Listening to instructions once is enough',
      body:
        'Students may assume they can hear instructions once and remember everything. Complex instructions often require repetition, note-taking, or asking clarifying questions to ensure understanding.',
      highlight: ['repetition', 'note-taking', 'clarifying questions'],
    },
    {
      title: 'All instructions must be given in a single step',
      body:
        'Some students expect directions to be given one step at a time rather than all at once. They must learn to process multi-step instructions and break them down mentally to complete tasks effectively.',
      highlight: ['process multi-step instructions'],
    },
    {
      title: 'Giving instructions means just listing steps',
      body:
        'Students may think giving instructions is just stating steps in order. Effective communication requires clarity, logical sequencing, and checking for understanding so the listener follows correctly.',
      highlight: ['clarity', 'logical sequencing', 'checking for understanding'],
    },
    {
      title: 'Asking for clarification means they weren\u2019t listening',
      body:
        'Some students believe asking questions makes them look like they weren\u2019t paying attention. In reality, asking for clarification is a critical listening skill that helps prevent mistakes and ensures they fully understand the task.',
      highlight: ['critical listening skill'],
    },
    {
      title: 'Nonverbal cues don\u2019t matter in following instructions',
      body:
        'Students often overlook tone, emphasis, or gestures that provide important context in spoken instructions. Understanding how something is said helps them interpret priorities or warnings within complex tasks.',
      highlight: ['tone', 'emphasis', 'gestures'],
    },
  ],
};

window.TEK_DATA = TEK_DATA;
