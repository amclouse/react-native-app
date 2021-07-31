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
  
  let [results, setResults] = useState([]);
  let [pageNumber, setpageNumber] = useState(0);
  let [search, setsearch] = useState(0);
  console.log(pageNumber);
  
  
  const fetchResults = async () => {
    let baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-";
    let key = "key=IG3qlGHsgEzEwG0Dkbeuf4MSSruYwGLl";
    let page = `&page=${pageNumber}`;
    let searchTerm = `&q=${search}`;
    await fetch(`${baseUrl}${key}${page}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      console.log(data);
      });
  }

  const incrementPage = (page) => {
    setpageNumber(pageNumber);
    fetchResults();
  }

  const decrementPage = () => {
    setpageNumber(pageNumber);
    fetchResults();
  }

  let articles = results.response;
  
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
    return (
      <ScrollView>
        { articles ?  articles.docs.map((article, index) => (
            <Card key={index} >
            <Card.Content>
              <Title> {article.headline.main} </Title>
              <Paragraph>{article.abstract}</Paragraph>
            </Card.Content>
            {article.multimedia.length > 0 ? <Card.Cover source={{uri : `http://www.nytimes.com/${article.multimedia[0].url}`}} /> : <Card.Cover alt="No img" /> }
            <Card.Actions>
              <Button onPress={() => handleOpenArticleUrl(article.web_url)} >Web Article</Button>
            </Card.Actions>
          </Card>
        )) : <ActivityIndicator /> }
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
          <View style={styles.buttonView} >
            <Button onPress={() => incrementPage(pageNumber ++)} >Next page</Button>
            { pageNumber > 0 ? <Button onPress={() => decrementPage(pageNumber --) } >Previous Page</Button> : null}
          </View>
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
  }, 
  buttonView : {
    display: "flex"
  },
  decremenButton: {
    display: 'none'
  }, 
});

export default App;
