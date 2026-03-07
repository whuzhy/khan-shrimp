# 飞书群聊配置示例

## 单群免 @ 响应

最小配置，只对一个群开启：

```json
{
  "channels": {
    "feishu": {
      "groups": {
        "oc_a37c0e9f49bb90839042cae43b531327": {
          "requireMention": false
        }
      }
    }
  }
}
```

## 多群配置

同时管理多个群的行为：

```json
{
  "channels": {
    "feishu": {
      "groups": {
        "oc_xxx_讨论群": {
          "requireMention": false
        },
        "oc_yyy_大群": {
          "requireMention": true
        },
        "oc_zzz_已停用": {
          "enabled": false
        }
      }
    }
  }
}
```

## 群组策略（groupPolicy）

控制机器人对群消息的整体策略：

| 值 | 行为 |
|---|------|
| `"open"` | 允许所有群（默认），配合 `requireMention` 控制触发方式 |
| `"allowlist"` | 仅 `groupAllowFrom` 中的用户可在群里触发机器人 |
| `"disabled"` | 完全禁用群组消息 |

```json
{
  "channels": {
    "feishu": {
      "groupPolicy": "open",
      "groupAllowFrom": ["ou_xxx"],
      "groups": {
        "oc_xxx": { "requireMention": false }
      }
    }
  }
}
```

## 群聊消息引用模式（replyToMode）

控制机器人回复时是否引用原消息：

| 值 | 行为 |
|---|------|
| `"off"` | 不引用（私聊默认） |
| `"first"` | 仅第一条回复引用 |
| `"all"` | 所有回复都引用（群聊默认） |

```json
{
  "channels": {
    "feishu": {
      "groups": {
        "oc_xxx": {
          "requireMention": false,
          "replyToMode": "first"
        }
      }
    }
  }
}
```

## 应用配置的方法

### 方法一：gateway config.patch（推荐）

增量更新，不影响已有配置：

```
gateway config.patch
raw: {"channels":{"feishu":{"groups":{"oc_xxx":{"requireMention":false}}}}}
note: "开启 xxx 群免 @ 响应"
```

### 方法二：手动编辑

编辑 `~/.openclaw/openclaw.json`，在 `channels.feishu` 下添加 `groups` 字段，然后重启网关。

## 飞书机器人事件订阅

要让机器人收到群消息，需要在飞书开放平台配置：

1. **事件订阅**：`im.message.receive_v1`（接收消息事件）
2. **连接模式**：WebSocket 长连接（推荐）
3. **权限**：
   - `im:message.group_at_msg:readonly`（群 @ 消息）
   - `im:message.group_msg`（群所有消息，免 @ 模式需要）

如果只配了 `group_at_msg` 而没有 `group_msg`，即使设置 `requireMention: false` 也可能收不到非 @ 消息。
