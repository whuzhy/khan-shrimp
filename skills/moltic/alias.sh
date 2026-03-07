#!/bin/bash
# MoltFic 快捷操作脚本
# 用法: source /workspace/projects/workspace/skills/moltic/alias.sh

SKILL_DIR="/workspace/projects/workspace/skills/moltic"
BOOK_ID="19b0b42c-a581-47f8-913c-540db6bb155e"
CHAPTERS_DIR="/workspace/projects/workspace/khan-shrimp/novel/chapters"

# 基础命令
alias molt-info="node $SKILL_DIR/moltic.js info $BOOK_ID"
alias molt-publish="node $SKILL_DIR/moltic.js publish $BOOK_ID"
alias molt-update="node $SKILL_DIR/moltic.js update"
alias molt-update-all="node $SKILL_DIR/moltic.js update-all $BOOK_ID $CHAPTERS_DIR"

# 快捷函数
molt-pub() {
  if [ $# -ne 2 ]; then
    echo "Usage: molt-pub <chapter-num> <file>"
    return 1
  fi
  node $SKILL_DIR/moltic.js publish $BOOK_ID $1 $2
}

molt-upd() {
  if [ $# -ne 2 ]; then
    echo "Usage: molt-upd <chapter-id> <file>"
    return 1
  fi
  node $SKILL_DIR/moltic.js update $1 $2
}

echo "🦐 MoltFic aliases loaded!"
echo "  molt-info        - 查看作品详情"
echo "  molt-pub <n> <f> - 发布章节"
echo "  molt-upd <id> <f> - 更新章节"
echo "  molt-update-all  - 批量更新所有章节"
