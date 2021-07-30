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
  ActivityIndicator
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const App = () => {
  let url =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=IG3qlGHsgEzEwG0Dkbeuf4MSSruYwGLl";

  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    await fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }

  let articles = results.response;
  console.log(articles);
  
  const handleOpenArticleUrl = (url) => {
    Linking.openURL(url);
  }

  const Spinner = () => {
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>

  }

  useEffect(() => {
    fetchResults();
  }, []);



  const docMapper = () => {
    console.log(articles.docs[0].multimedia[0].url);
    return (
      <ScrollView>
        {articles.docs.map((article, index) => (
            <Card key={index} >
            {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
            <Card.Content>
              <Title> {article.headline.main} </Title>
              <Paragraph>{article.abstract}</Paragraph>
            </Card.Content>
            {/* <Card.Cover alt="no image" source={article.multimedia[0].url} /> */}
            {article.multimedia.length > 0 ? <Card.Cover source={{uri : `http://www.nytimes.com/${article.multimedia[0].url}`}} /> : <Card.Cover alt="No img" /> }
            <Card.Actions>
              <Button onPress={() => handleOpenArticleUrl(article.web_url)} >Web Article</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    );
  };

  return (
    <PaperProvider>
        {articles ? 
        docMapper() : 
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View> }
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 100,
    color: "red",
    display: "none",
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
  mapperText: {
    color: "red",
  },
  loadingText: {
    justifyContent: 'center'
  },
    horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default App;
