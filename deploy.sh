#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

PROJECT="avebusinessxyz"

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
echo 'avebusiness.xyz' > CNAME;
git add -A;
git commit -m 'deploy';
git push -f https://$GITHUB_ACCESS_TOKEN@github.com/avebusinessxyz/avebusinessxyz.github.io.git master:main;


ENDSSH

cd -
