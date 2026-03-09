# Compress & Decompress Files - Gzip

Проект реалізує функції для стиснення та розпакування файлів за допомогою алгоритму Gzip у Node.js.

## 📋 Опис

Проект містить дві основні асинхронні функції:
- **`compressFile`** - стискає файл за допомогою Gzip
- **`decompressFile`** - розпаковує стиснутий файл

## ✨ Особливості

- ✅ Асинхронна робота з використанням `async/await`
- ✅ Stream API для ефективної роботи з великими файлами
- ✅ Автоматична генерація унікальних імен файлів
- ✅ Повна обробка помилок з детальними повідомленнями
- ✅ ESM модульна система
- ✅ JSDoc документація
- ✅ Готовність до тестування з JEST

## 🚀 Встановлення

```bash
# Клонування репозиторію
git clone <repository-url>

# Перехід до директорії проекту
cd lessonJS_37

# Node.js має бути встановлений (версія 14.x або вище)
```

## 💻 Використання

### Базове використання

```javascript
import { compressFile, decompressFile } from './main.js';

async function example() {
  try {
    // Стиснення файлу
    const compressed = await compressFile('./files/source.txt');
    console.log('Стиснутий файл:', compressed);
    // Виведе: ./files/source.txt.gz

    // Розпакування файлу
    const decompressed = await decompressFile(compressed, './files/restored.txt');
    console.log('Розпакований файл:', decompressed);
    // Виведе: ./files/restored.txt
  } catch (error) {
    console.error('Помилка:', error.message);
  }
}

example();
```

### Запуск тестової перевірки

```bash
node main.js
```

## 📚 API

### `compressFile(filePath)`

Стискає файл за допомогою алгоритму Gzip.

**Параметри:**
- `filePath` (string) - Шлях до файлу, який потрібно стиснути

**Повертає:**
- `Promise<string>` - Шлях до стиснутого файлу

**Виключення:**
- Викидає помилку, якщо файл не знайдено або не читається
- Викидає помилку при невдалому стисненні

**Приклад:**
```javascript
const compressed = await compressFile('./data/document.txt');
// Результат: './data/document.txt.gz'
```

### `decompressFile(compressedFilePath, destinationFilePath)`

Розпаковує файл, стиснутий за допомогою Gzip.

**Параметри:**
- `compressedFilePath` (string) - Шлях до стиснутого файлу
- `destinationFilePath` (string) - Шлях для збереження розпакованого файлу

**Повертає:**
- `Promise<string>` - Шлях до розпакованого файлу

**Виключення:**
- Викидає помилку, якщо стиснутий файл не знайдено
- Викидає помилку при невдалому розпакуванні

**Приклад:**
```javascript
const decompressed = await decompressFile(
  './data/document.txt.gz',
  './data/document_restored.txt'
);
// Результат: './data/document_restored.txt'
```

## 🔧 Технічні деталі

### Генерація унікальних імен

Якщо файл з таким іменем вже існує, автоматично додається номер:
- `source.txt.gz` → `source_1.txt.gz` → `source_2.txt.gz`
- `restored.txt` → `restored_1.txt` → `restored_2.txt`

### Використані технології

- **Node.js** - середовище виконання
- **fs/promises** - асинхронна робота з файловою системою
- **zlib** - бібліотека для компресії/декомпресії
- **stream/promises** - робота зі стрімами
- **path** - обробка шляхів до файлів

### Структура проекту

```
lessonJS_37/
├── main.js           # Основний файл з функціями
├── README.md         # Документація
└── files/           # Тестові файли
    ├── source.txt
    ├── source.txt.gz
    └── source_decompressed.txt
```

## ⚠️ Обмеження

- Працює **тільки в Node.js**, не підтримується в браузері
- Для роботи в браузері потрібна альтернативна реалізація з Web APIs

## 🧪 Тестування

Проект готовий до тестування з використанням JEST:

```javascript
// Приклад тесту
import { compressFile, decompressFile } from './main.js';
import { readFile } from 'fs/promises';

test('compresses and decompresses file correctly', async () => {
  const original = await readFile('./files/source.txt', 'utf-8');
  const compressed = await compressFile('./files/source.txt');
  const decompressed = await decompressFile(compressed, './files/test_output.txt');
  const result = await readFile(decompressed, 'utf-8');
  
  expect(result).toBe(original);
});
```

## 📝 Приклад виводу

```bash
$ node main.js
#58. JavaScript homework example file
./files/source.txt.gz
./files/source_decompressed.txt
```

## 🤝 Вклад

Цей проект створено як навчальне завдання для курсу JavaScript.

## 📄 Ліцензія

Навчальний проект для особистого використання.
