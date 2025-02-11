const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'summarize-ng', location: 'asia-south1'});
const model = 'gemini-1.5-flash-002';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    {
      'category': 'HARM_CATEGORY_HATE_SPEECH',
      'threshold': 'OFF',
    },
    {
      'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
      'threshold': 'OFF',
    },
    {
      'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      'threshold': 'OFF',
    },
    {
      'category': 'HARM_CATEGORY_HARASSMENT',
      'threshold': 'OFF',
    }
  ],
  systemInstruction: {
    parts: [textsi_1]
  },
});

const text1 = {text: `On 3 november i spent 
Milk 28, Rice 111
Bread 30
Yakult 80
Paneer 79 

on 2nd nov 
70 breakfast
10 water
30 milk

Convert this data to an object with properties name, category, price and date and send them back as response structure provided`};
const textsi_1 = {text: `**System Instruction:**

You are an assistant that processes and categorizes expense summaries into a structured JSON format. Each expense entry includes a `date`, `name`, `category`, and, when available, a `price`. The goal is to ensure each expense is directly accessible by `date` in Firestore.

Use one of the following categories for each expense based on the provided description:

- Bills
- EMI
- Education
- Entertainment
- Food
- Groceries
- Health
- Home Utilities
- Insurance
- Investment
- Personal Care
- Refreshments
- Rent
- Saving
- Shopping
- Transportation
- Travel
- Donate
- Miscellaneous

**Instructions:**

1. **Categorize Expenses**: Assign each expense to one of the predefined categories. If the item name is ambiguous or written in mixed languages (e.g., “Hinglish” or non-standardized language forms), attempt to identify the category using multilingual recognition.
  
2. **Mandatory Properties**: Each expense item should contain:
  - `date` (the date the expense was made),
  - `name` (the item’s name),
  - `category` (selected from the predefined categories).
  - `price` is optional and can be omitted if not provided. Watch the pattern carefully as the price can be before or after the item name.

3. **Unmapped Items**: If an item cannot be categorized or lacks a required parameter (e.g., missing `price`), add it to the `unmappedExpenseData` array. This array will be used to prompt the user for additional information.

4. **Avoid Nested Grouping**: Structure each expense as a standalone object to ensure easy querying by `date` in Firestore. Do not group items within nested arrays by date or category.

---

**Example Format:**

```json
{
  \"expenseData\": [
   {
    \"date\": \"2024-11-03\",
    \"name\": \"Milk\",
    \"category\": \"Groceries\",
    \"price\": 28
   },
   {
    \"date\": \"2024-11-03\",
    \"name\": \"Bus fare\",
    \"category\": \"Transportation\",
    \"price\": 15
   },
   {
    \"date\": \"2024-11-03\",
    \"name\": \"Rice\",
    \"category\": \"Groceries\",
    \"price\": 111
   }
  ],
  \"unmappedExpenseData\": [
   {
    \"date\": \"2024-11-03\",
    \"name\": \"item without price or uncategorized item\",
    \"missingInfo\":\"name of parameter or message to get more info with sensible message to show to user\"
    // Add more fields as needed if details are missing
   }
  ]
}
```

---

This instruction structure ensures clarity for each property, includes multilingual recognition guidance, and emphasizes the importance of unmapped expenses for follow-up with the user.`};

async function generateContent() {
  const req = {
    contents: [
      {role: 'user', parts: [text1]}
    ],
  };

  const streamingResp = await generativeModel.generateContentStream(req);

  for await (const item of streamingResp.stream) {
    process.stdout.write('stream chunk: ' + JSON.stringify(item) + '\n');
  }

  process.stdout.write('aggregated response: ' + JSON.stringify(await streamingResp.response));
}

generateContent();



safetySettings: [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },




On 3 november i spent 
Milk 28, Rice 111
Bread 30
Yakult 80
Paneer 79
kabuli chana 114
Kashmiri chikui 65
Chicken masala 43
Garam masala 42
Poha 65
Sonpapdi 63
Pant 99
Mithai mate 61
Green chilli sauce 49
bhujiya 95
Dabbi small 99
Convert this data to an object with properties name, category, price and date
