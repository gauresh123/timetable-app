import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { API_KEY } from "../constants/baseURL";
import { ActivityIndicator } from "react-native-paper";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [{ text: "How can i help you?" }],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef(null);

  const handleSend = async () => {
    if (inputText.trim() === "") return;
    if (loading) return;

    let updatedChat = [
      ...messages,
      {
        role: "user",
        parts: [{ text: inputText }],
      },
    ];

    try {
      setLoading(true);
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );
      const modelRes =
        res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      console.log(modelRes, "modelRes");

      if (modelRes) {
        const updatedChatwithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelRes }],
          },
        ];
        setMessages(updatedChatwithModel);
        setInputText("");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to fetch response from gemini!");
    } finally {
      setLoading(false);
    }
  };

  // Automatically scroll to the last message when a new message is added
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item?.role === "user" ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <Text style={item?.role === "user" ? styles.userText : styles.aiText}>
        {item?.parts[0]?.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Message List */}

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          {loading ? (
            <ActivityIndicator animating={true} size="small" color="#fff" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageList: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  userMessage: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  aiMessage: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
  },
  userText: {
    color: "#fff",
  },
  aiText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatScreen;
