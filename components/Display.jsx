import React, { useRef, useState, useEffect } from "react";
import {
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  ListItem,
  TextInput,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
} from "react-native-paper";
import defImg from "../assets/defaultImg.png";




const Display = ({ articles }) => {

  let [loading, setloading] = useState(true);

  const onReload = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const handleOpenArticleUrl = (url) => {
    Linking.openURL(url);
  };


  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setloading(false);
      }, 2000);
    }
  }, []);

  return (
      <ScrollView>
        {!loading ? (
          articles.docs.map((article, index) => (
            <Card key={index}>
              <Card.Content>
                <Title> {article.headline.main} </Title>
                <Paragraph>{article.abstract}</Paragraph>
              </Card.Content>

              {article.multimedia.length > 0 ? (
                <Card.Cover
                  source={{
                    uri: `http://www.nytimes.com/${article.multimedia[0].url}`,
                  }}
                />
              ) : (
                <Card.Cover source={defImg} />
              )}

              <Card.Actions>
                <Button onPress={() => handleOpenArticleUrl(article.web_url)}>
                  Web Article
                </Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
      
  );
};

export default Display;
