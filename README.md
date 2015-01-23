# PlayGruntSample

Gruntを使ったPlayFrameworkアプリケーションのサンプルです。

## version
PlayFramework 2.3.7

Grunt 0.4.5

## structure

Play起動時（`activator run`）に、Gruntが起動します。

Gruntは`/ui/dev`フォルダ内のソースを処理し、`/ui/ui-test-public`フォルダに出力します。

また、Gruntは`/ui/ui-test-public`を`/public`に同期します。

これにより、`ui`フォルダ内の変更をPlayFrameworkに対して動的に反映することができます。

## how to use
```
cd ui
npm install
cd ..
activator run
```
