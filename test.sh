#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

PROJECT="avedex-application-test"

yarn
# 构建
yarn run build

# cd 到构建输出的目录下
cd dist
cp index.html 404.html

touch .nojekyll

cd ..
scp -r dist root@54.255.13.84:/root/code/$PROJECT-dist

GITHUB_ACCESS_TOKEN='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'

ssh root@54.255.13.84 << ENDSSH
cd /root/code/;
rm -rf $PROJECT;
mv $PROJECT-dist $PROJECT;
cd $PROJECT;
git init;
git add -A;
git commit -m 'deploy';
git push -f https://$GITHUB_ACCESS_TOKEN@github.com/ave-test/ave-test.github.io.git master:main;

ENDSSH

cd -
