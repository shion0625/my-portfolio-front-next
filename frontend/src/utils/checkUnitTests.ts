const fs = require('fs')
const path = require('path')

const SRC_DIRECTORY = 'src'

export function checkUnitTests(
  srcDirectory: string,
  testDirectory: string,
  targetDirectories: string[],
  choice?: boolean,
) {
  fs.readdir(srcDirectory, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      console.error('ディレクトリの読み込み中にエラーが発生しました:', err)
      return
    }
    files.forEach((file) => {
      const srcFilePath = path.join(srcDirectory, file)
      const testFilePath = getTestFilePath(srcFilePath, testDirectory)

      fs.stat(srcFilePath, (err: NodeJS.ErrnoException | null, stats: any) => {
        if (err) {
          console.error('ファイルの状態を取得中にエラーが発生しました:', err)
          return
        }

        if (stats.isDirectory()) {
          if (isTargetDirectory(srcFilePath, targetDirectories)) {
            checkUnitTests(srcFilePath, testDirectory, targetDirectories, choice)
          }
        } else if (stats.isFile()) {
          fs.access(testFilePath, fs.constants.F_OK, (err: NodeJS.ErrnoException | null) => {
            if (!err && choice) {
              console.log(`👍${srcFilePath} の単体テストが見つかりました。`)
            }
            if (err) {
              console.log(`${srcFilePath} の単体テストが見つかりませんでした。`)
            }
          })
        }
      })
    })
  })
}

function getTestFilePath(srcFilePath: string, testDirectory: string): string {
  const relativePath = path.relative(SRC_DIRECTORY, srcFilePath)
  const testFilePath = path.join(testDirectory, relativePath)

  if (srcFilePath.endsWith('.ts')) {
    return testFilePath.replace('.ts', '.test.ts')
  } else if (srcFilePath.endsWith('.tsx')) {
    return testFilePath.replace('.tsx', '.test.tsx')
  } else {
    return testFilePath
  }
}

function isTargetDirectory(directoryName: string, targetDirectories: string[]): boolean {
  return targetDirectories.some((target) => directoryName.includes(target))
}

checkUnitTests('./src', './__test__', ['components', 'utils'], false)
