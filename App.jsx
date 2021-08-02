import React, { useRef, useState, useEffect } from "react";
import {
  DrawerLayoutAndroid,
  // Text,
  StyleSheet,
  View,
  ListItem,
  TextInput,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Searchbar,
  Text,
  Appbar
} from "react-native-paper";
import Display from "./components/Display";

const App = () => {
  let [results, setResults] = useState([]);
  let [pageNumber, setpageNumber] = useState(0);
  let [searchQuery, setSearchQuery] = useState("");
  let [loading, setloading] = useState(true);

  let scrollView = useRef(null);

  const fetchResults = async (search) => {
    let baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-";
    let key = "key=IG3qlGHsgEzEwG0Dkbeuf4MSSruYwGLl";
    let page = `&page=${pageNumber}`;
    let searchTerm = `&q=${search}`;

    await fetch(`${baseUrl}${key}${page}${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        console.log(data);
      });
  };
  let articles = results.response;


  const incrementPage = (page) => {
    setpageNumber(pageNumber);
    fetchResults();
  };

  const decrementPage = () => {
    setpageNumber(pageNumber);
    fetchResults();
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setloading(false);
      }, 2000);
    }
    fetchResults();
    return() => {
      console.log('component unmounted');
    }
  }, []);

  return (
    <PaperProvider>
      <ScrollView ref={scrollView} style={styles.container}>
        <Text style={{textAlign: 'center'}} >The Latest News From the New York Times</Text>
        {articles ? (
          <Display articles={articles} />
          ) : (
            <ActivityIndicator size="small" color="#0000ff" />
            )}
        <ScrollView style={styles.buttonView}>
          <Button onPress={() => incrementPage(pageNumber++)}>Next page</Button>
          {pageNumber > 0 ? (
            <Button onPress={() => decrementPage(pageNumber--)}>
              Previous Page
            </Button>
          ) : null}
        </ScrollView>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
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
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  buttonView: {},
  decremenButton: {
    display: "none",
  },
  searchBar: {
    marginTop: "20px",
  },
});

export default App;
