#!/bin/bash

# 确保脚本在出错时停止执行
set -e

# 检查是否已初始化Git仓库
if [ ! -d ".git" ]; then
  echo "Initializing Git repository..."
  git init
  git add .
  git commit -m "Initial commit"
fi

# 检查是否已添加GitHub远程仓库
if ! git remote | grep -q origin; then
  echo "请先在GitHub上创建仓库"
  echo "1. 访问 https://github.com/new"
  echo "2. 选择公开(Public)仓库"
  echo "3. 不要添加README、.gitignore或许可证"
  echo "4. 点击'创建仓库'"
  echo ""
  echo "创建完成后，请输入您的GitHub用户名:"
  read github_username
  echo "请输入您的GitHub仓库名称(例如: Trial-Bridge):"
  read repo_name
  git remote add origin "https://github.com/$github_username/$repo_name.git"
  
  # 更新.env.production文件中的路径
  echo "# Production Environment Variables" > .env.production
  echo "VITE_BASE_URL=/$repo_name/" >> .env.production
  echo "VITE_PUBLIC_URL=/$repo_name/" >> .env.production
else
  # 如果已经设置了远程仓库，提取仓库名称
  repo_url=$(git remote get-url origin)
  github_username=$(echo $repo_url | sed -n 's/.*github\.com[\/:]\([^\/]*\).*/\1/p')
  repo_name=$(echo $repo_url | sed -n 's/.*\/\([^\/]*\)\.git.*/\1/p')
  
  # 检查仓库是否存在
  echo "检查GitHub仓库是否存在..."
  http_code=$(curl -s -o /dev/null -w "%{http_code}" "https://github.com/$github_username/$repo_name")
  
  if [ "$http_code" = "404" ]; then
    echo "错误: 仓库 https://github.com/$github_username/$repo_name 不存在!"
    echo "请确认仓库已创建，或者移除当前远程仓库设置并重新运行此脚本:"
    echo "git remote remove origin"
    exit 1
  fi
fi

# 构建项目
echo "Building project..."
npm run build

# 部署到GitHub Pages
echo "Deploying to GitHub Pages..."
npm run deploy:gh-pages

# 推送代码到GitHub
echo "Pushing code to GitHub..."
git add .
git commit -m "Update site"
git push -u origin main

# 从远程仓库URL中提取GitHub用户名
github_username=$(git remote get-url origin | sed -n 's/.*github\.com[\/:]\([^\/]*\).*/\1/p')
repo_name=$(git remote get-url origin | sed -n 's/.*\/\([^\/]*\)\.git.*/\1/p')

echo "Deployment completed successfully!"
echo "Your site should be available at: https://$github_username.github.io/$repo_name/"