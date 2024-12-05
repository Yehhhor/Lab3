// export class Storage {
//   public static save(key: string, value: any): void {
//     localStorage.setItem(key, JSON.stringify(value));
//   }

//   public static load(key: string): any {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : null;
//   }

//   public static remove(key: string): void {
//     localStorage.removeItem(key);
//   }

//   public static clear(): void {
//     localStorage.clear();
//   }
// }

export class Storage {
  // Метод save приймає будь-який тип, який може бути серіалізований у JSON (об'єкт, масив, число, рядок, булеве значення)
  public static save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Метод load тепер має тип, який відповідає збереженим даним
  public static load<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  public static remove(key: string): void {
    localStorage.removeItem(key);
  }

  public static clear(): void {
    localStorage.clear();
  }
}
