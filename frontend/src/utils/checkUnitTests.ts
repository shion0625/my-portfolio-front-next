const fs = require('fs');
const path = require('path');

const SRC_DIRECTORY = 'src'
function checkUnitTests(srcDirectory, testDirectory, targetDirectories, choice) {
  fs.readdir(srcDirectory, (err, files) => {
    if (err) {
      console.error('ディレクトリの読み込み中にエラーが発生しました:', err);
      return;
    }

    files.forEach((file) => {
      const srcFilePath = path.join(srcDirectory, file);
      const testFilePath = getTestFilePath(srcFilePath, testDirectory);

      fs.stat(srcFilePath, (err, stats) => {
        if (err) {
          console.error('ファイルの状態を取得中にエラーが発生しました:', err);
          return;
        }

        if (stats.isDirectory()) {
          if (isTargetDirectory(srcFilePath, targetDirectories)) {
            checkUnitTests(srcFilePath, testDirectory, targetDirectories, choice);
          }
} else if (stats.isFile()) {
          fs.access(testFilePath, fs.constants.F_OK, (err) => {
            if (!err && choice) {
              console.log(`👍${srcFilePath} の単体テストが見つかりました。`);
            }
            if(err){
              console.log(`${srcFilePath} の単体テストが見つかりませんでした。`);

            }
          });
        }
      });
    });
  });
}

function getTestFilePath(srcFilePath, testDirectory) {
  const relativePath = path.relative(SRC_DIRECTORY, srcFilePath);
  const testFilePath = path.join(testDirectory, relativePath);

  if (srcFilePath.endsWith('.ts')) {
    return testFilePath.replace('.ts', '.test.ts');
  } else if (srcFilePath.endsWith('.tsx')) {
    return testFilePath.replace('.tsx', '.test.tsx');
  } else {
    return testFilePath;
  }
}

function isTargetDirectory(directoryName, targetDirectories) {
  return targetDirectories.some((target) => directoryName.includes(target))
}
module.exports = {
  checkUnitTests
}
