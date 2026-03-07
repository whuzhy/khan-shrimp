---
name: feishu-multi-bot-collab
description: |
  飞书群聊中多机器人（虾虾）协作与交互的技能。解决 OpenClaw 机器人在飞书群中无法真正 @ 其他机器人、多虾讨论触达失败等问题。

  **当以下情况时使用此 Skill**：
  (1) 需要在飞书群里与其他 OpenClaw 机器人（虾）互动讨论
  (2) 需要配置群聊免 @ 响应（requireMention: false）
  (3) 在群里发消息想触达另一只虾但 @ 不生效
  (4) 用户提到"虾虾对话"、"机器人互动"、"群里讨论"、"多虾协作"
  (5) 需要理解飞书群聊中机器人消息的接收机制和限制
---

# 飞书多机器人群聊协作

## 核心问题

飞书群里多只 OpenClaw 虾（机器人）需要互相讨论时，面临两个关键限制：

1. **@ 不生效**：通过 `message` tool 发送的文本中 `@MichaelClaw` 只是纯文字，飞书不会解析为真正的 @ mention（无蓝色高亮、无通知推送）
2. **消息不可见**：默认配置下机器人只在被 @ 时才响应群消息（`requireMention: true`），普通群消息收不到

## 解决方案

### 方案一：引用回复触达（推荐，无需配置变更）

飞书的**引用回复（replyTo）**会通知被引用消息的发送者，绕开 @ 限制。

```
message tool 参数：
  action: send
  channel: feishu
  target: chat:<chat_id>
  replyTo: <对方机器人之前发的 message_id>
  message: "你的消息内容"
```

**原理**：回复某条消息时，飞书会推送通知给该消息的发送者（无论是人还是机器人）。

**前提**：对方机器人在群里有过发言（有 message_id 可引用）。

### 方案二：开启群聊免 @ 响应（推荐用于持续协作场景）

配置特定群组不需要 @ 即可接收所有消息：

```json
{
  "channels": {
    "feishu": {
      "groups": {
        "<chat_id>": {
          "requireMention": false
        }
      }
    }
  }
}
```

使用 `gateway config.patch` 应用配置：

```json
{"channels":{"feishu":{"groups":{"<chat_id>":{"requireMention":false}}}}}
```

配置生效后，该群内所有消息都会实时推送给机器人，无需 @ 也能响应。

**⚠️ 注意**：开启后群里每条消息都会触达，注意控制响应频率，避免过度回复。参考 AGENTS.md 中的群聊发言准则。

### 方案三：话题（Thread）内讨论

在同一个话题内回复可以保持上下文连贯，但**不会自动通知话题内的其他参与者**（除非引用回复他们的消息）。

话题适合组织讨论结构，但触达仍需配合方案一或方案二。

## 不可行的方案（踩坑记录）

| 方案 | 为什么不行 |
|------|-----------|
| `message` tool 文本里写 `@MichaelClaw` | 纯文字，飞书不解析为 @ |
| `message` tool 用 `<at user_id="ou_xxx">` 标签 | `message` tool 不解析 HTML 标签 |
| `feishu_im_user_message` 发带 @ 的消息 | 需要 `im:message.send_as_user` 权限（多数场景未开通） |
| `feishu_chat_members` 查机器人成员 | API 不返回群内的机器人成员，只返回人类成员 |

## 实战流程

### 场景：两只虾在群里讨论内容

1. **获取群消息**：用 `feishu_im_user_get_messages` 拉取群里最近消息
2. **找到对方虾的消息**：识别 `sender.sender_type: "app"` 且非自己 app_id 的消息
3. **引用回复讨论**：用 `message` tool 的 `replyTo` 参数回复对方的 message_id
4. **持续互动**：对方收到通知后回复，再引用对方最新消息继续讨论

### 场景：长期协作群

1. **一次性配置**：用 `gateway config.patch` 给群开启 `requireMention: false`
2. **实时响应**：之后群内所有消息自动推送，可以自然参与讨论
3. **控制发言**：遵循群聊发言准则，不要对每条消息都回复

## 关键 ID 对照

在群聊场景中，同一个机器人有两种 ID：

| ID 类型 | 格式 | 用途 |
|---------|------|------|
| App ID（`sender.id`） | `cli_xxx` | 消息中识别发送者是哪个 app |
| Open ID（`mentions.id`） | `ou_xxx` | @ 某人时使用的 ID |

**注意**：`feishu_chat_members` 只返回人类成员的 open_id，不返回机器人。机器人的 open_id 需要从群消息的 `mentions` 字段中获取。

## 配置参考

详见 [references/config-examples.md](references/config-examples.md)。
