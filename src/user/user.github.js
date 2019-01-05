import { RESTDataSource } from 'apollo-datasource-rest';

class GitHubUsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.github.com/';
  }

  async getUser(id) {
    return this.get(`users/${id}`);
  }

  //Best Practices around this?  
  async getUserRepoCount(id) {
    const user = await this.get(`users/${id}`);
    if (user && user.public_repos) {
        return user.public_repos;
    } else {
        return null;
    }
    
    
  }
}

export default GitHubUsersAPI;