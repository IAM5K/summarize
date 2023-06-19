export class Analyze {
  getCategoryWiseData(data: any[]): any[] {
    const categories: string[] = [];
    const result: any[] = [];
    for (const item of data) {
      const { type, amount } = item;
      if (!categories.includes(type)) {
        categories.push(type);
        result.push({ Category: type, Amount: amount });
      } else {
        const existingCategory = result.find((cat) => cat.Category === type);
        existingCategory.Amount += amount;
      }
    }
    return result;
  }
}
