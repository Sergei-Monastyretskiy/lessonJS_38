console.log('#58. JavaScript homework example file');

import { createReadStream, createWriteStream } from 'fs';
import { access, constants } from 'fs/promises';
import { createGzip, createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { parse, join, dirname } from 'path';

/*
 *
 * #1
 *
 * Технічне завдання для розробки функції "compressFile"
 *
 * Задача:
 * Розробити асинхронну функцію, що використовує алгоритм Gzip для компресії заданого файлу.
 * Функція має генерувати унікальне ім'я для компресованого файлу, якщо файл з таким іменем вже існує,
 * та забезпечувати високий рівень надійності та безпеки процесу компресії.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *    - `filePath`: Шлях до файлу, який потрібно компресувати.
 *
 * 2. Вихідні дані:
 *    - Функція повертає шлях до компресованого файлу як рядок.
 *
 * 3. Унікальність:
 *    - Перевірка наявності існуючих файлів з таким самим іменем і створення унікального імені файлу
 *      шляхом додавання номера до існуючого імені, якщо необхідно.
 *
 * 4. Обробка помилок:
 *    - Функція має ідентифікувати та коректно обробляти помилки читання, запису та доступу до файлів.
 *    - В разі помилок, функція має повертати відповідні повідомлення про помилку або коди помилок,
 *      що дозволяють користувачеві або іншим частинам програми адекватно реагувати на такі ситуації.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), включаючи асинхронні функції, стрімове API Node.js, та ESM
 *   для легкої інтеграції та тестування.
 * - Функція має бути написана таким чином, щоб її можна було експортувати та використовувати в інших частинах програми
 *   або тестових сценаріях.
 * - Забезпечення документації коду з описом параметрів, процесу роботи, виключень, які можуть бути сгенеровані,
 *   та прикладами використання.
 * - Підготовка функції для можливості легкого мокування та тестування за допомогою JEST.
 *
 */

/**
 * Асинхронно компресує файл за допомогою алгоритму Gzip.
 * 
 * @param {string} filePath - Шлях до файлу, який потрібно компресувати.
 * @returns {Promise<string>} Шлях до компресованого файлу.
 * @throws {Error} Якщо файл не існує або виникла помилка при компресії.
 * 
 * @example
 * const compressed = await compressFile('./files/source.txt');
 * console.log(compressed); // './files/source.txt.gz'
 */
async function compressFile(filePath) {
  try {
    // Перевірка існування вхідного файлу
    await access(filePath, constants.R_OK);
  } catch (error) {
    throw new Error(`File not found or not readable: ${filePath}`);
  }

  // Генерація унікального імені для компресованого файлу
  let outputFilePath = `${filePath}.gz`;
  let counter = 1;

  while (true) {
    try {
      await access(outputFilePath, constants.F_OK);
      // Якщо файл існує, генеруємо нове ім'я
      const parsed = parse(filePath);
      outputFilePath = join(parsed.dir, `${parsed.name}_${counter}${parsed.ext}.gz`);
      counter++;
    } catch {
      // Файл не існує, можемо використовувати це ім'я
      break;
    }
  }

  try {
    // Створення стрімів для читання, компресії та запису
    const readStream = createReadStream(filePath);
    const gzip = createGzip();
    const writeStream = createWriteStream(outputFilePath);

    // Використання pipeline для обробки стрімів
    await pipeline(readStream, gzip, writeStream);

    return outputFilePath;
  } catch (error) {
    throw new Error(`Compression failed: ${error.message}`);
  }
}

/*
 *
 * #2
 *
 * Технічне завдання для розробки функції "decompressFile"
 *
 * Задача:
 * Розробити асинхронну функцію, яка використовує алгоритм Gzip для розпакування заданого компресованого файлу у вказане місце збереження. Функція має генерувати унікальне ім'я для розпакованого файлу, якщо файл з таким іменем вже існує, та забезпечувати високий рівень надійності та безпеки процесу розпакування.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - `compressedFilePath`: Шлях до компресованого файлу, який потрібно розпакувати.
 *  - `destinationFilePath`: Шлях, де буде збережено розпакований файл.
 *
 * 2. Вихідні дані:
 *  - Функція повертає шлях до розпакованого файлу як рядок.
 *
 * 3. Унікальність:
 *  - Перевірка наявності існуючих файлів з таким самим іменем і створення унікального імені файлу шляхом додавання номера до існуючого імені, якщо необхідно.
 *
 * 4. Обробка помилок:
 *  - Функція має ідентифікувати та коректно обробляти помилки читання, запису та доступу до файлів.
 *  - В разі помилок, функція має повертати відповідні повідомлення про помилку або коди помилок,
 *    що дозволяють користувачеві або іншим частинам програми адекватно реагувати на такі ситуації.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), включаючи асинхронні функції, стрімове API Node.js, та ESM для легкої інтеграції та тестування.
 * - Функція має бути написана таким чином, щоб її можна було експортувати та використовувати в інших частинах програми або тестових сценаріях.
 * - Забезпечення документації коду з описом параметрів, процесу роботи, виключень, які можуть бути сгенеровані, та прикладами використання.
 * - Підготовка функції для можливості легкого мокування та тестування за допомогою JEST.
 *
 */

/**
 * Асинхронно розпаковує файл, компресований за допомогою Gzip.
 * 
 * @param {string} compressedFilePath - Шлях до компресованого файлу.
 * @param {string} destinationFilePath - Шлях для збереження розпакованого файлу.
 * @returns {Promise<string>} Шлях до розпакованого файлу.
 * @throws {Error} Якщо файл не існує або виникла помилка при розпакуванні.
 * 
 * @example
 * const decompressed = await decompressFile('./files/source.txt.gz', './files/restored.txt');
 * console.log(decompressed); // './files/restored.txt'
 */
async function decompressFile(compressedFilePath, destinationFilePath) {
  try {
    // Перевірка існування компресованого файлу
    await access(compressedFilePath, constants.R_OK);
  } catch (error) {
    throw new Error(`Compressed file not found or not readable: ${compressedFilePath}`);
  }

  // Генерація унікального імені для розпакованого файлу
  let outputFilePath = destinationFilePath;
  let counter = 1;

  while (true) {
    try {
      await access(outputFilePath, constants.F_OK);
      // Якщо файл існує, генеруємо нове ім'я
      const parsed = parse(destinationFilePath);
      outputFilePath = join(parsed.dir, `${parsed.name}_${counter}${parsed.ext}`);
      counter++;
    } catch {
      // Файл не існує, можемо використовувати це ім'я
      break;
    }
  }

  try {
    // Створення стрімів для читання, декомпресії та запису
    const readStream = createReadStream(compressedFilePath);
    const gunzip = createGunzip();
    const writeStream = createWriteStream(outputFilePath);

    // Використання pipeline для обробки стрімів
    await pipeline(readStream, gunzip, writeStream);

    return outputFilePath;
  } catch (error) {
    throw new Error(`Decompression failed: ${error.message}`);
  }
}

// ! Перевірка роботи функцій стиснення та розпакування файлів
async function performCompressionAndDecompression() {
  try {
    const compressedResult = await compressFile('./files/source.txt')
    console.log(compressedResult)
    const decompressedResult = await decompressFile(compressedResult, './files/source_decompressed.txt')
    console.log(decompressedResult)
  } catch (error) {
    console.error('Error during compression or decompression:', error)
  }
}
performCompressionAndDecompression()

export { compressFile, decompressFile };
