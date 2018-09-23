import { 
  decorate, 
  observable, 
  action, 
  runInAction 
} from 'mobx';

const GQL_ENDPOINT = '//api.github.com/graphql';
const GQL_QUERY = `query Search($query: String!) {
  search(query: $query, type: REPOSITORY, first: 10) {
    nodes {
      ... on Repository {
        id
        url
        nameWithOwner
        languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            name
          }
        }
        releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            name
          }
        }
      }
    }
  }
}`;

class SearchModel {
  results = [];

  fetchResults = async (apiToken, query) => {
    const res = await fetch(GQL_ENDPOINT, {
      method: 'post',
      headers: {
        'Authorization': `bearer ${apiToken}`
      },
      body: JSON.stringify({
        query: GQL_QUERY,
        variables: { query }
      })
    });

    const json = await res.json(),
      nodes = json.data.search.nodes;

    const results = nodes.map(node => {
      const languages = node.languages.nodes,
        releases = node.releases.nodes;

      return {
        id: node.id,
        nameWithOwner: node.nameWithOwner,
        url: node.url,
        primaryLanguage: languages.length > 0 && languages[0].name,
        lastReleaseTag: releases.length > 0 && releases[0].name
      }
    });

    runInAction(() => {
      this.results = results;
    });
  }

  clearResults = () => {
    this.results = [];
  }
}

decorate(SearchModel, {
  results: observable,
  clearResults: action
});

export default SearchModel;
