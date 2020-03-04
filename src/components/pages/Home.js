import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';

export class Home extends Component {
  state = {
    tweets: [],
    customTweets: [],
    filteredUrls: [],
    validLinks: []
  };

  async componentDidMount() {
    const response = await fetch(
      'https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/get-timeline'
    );
    const res = await response.json();
    var resParsed = JSON.parse(res);
    this.setState({ tweets: resParsed });

    this.extractedTweetData();
  }

  extractedTweetData() {
    //iterate through original tweet object to get the data i need
    var customTweetData = this.state.tweets.map(twt => ({
      urls: twt.entities.urls.map(twt2 => twt2.url),
      tweetId: twt.id,
      userId: twt.user.id,
      userName: twt.user.name,
      screenName: '@' + twt.user.screen_name,
      retweetedStatus: twt.retweeted_status ? 'true' : 'false',
      reply: twt.in_reply_to_status_id,
      tweetText: twt.full_text,
      avatarUrl: twt.user.profile_image_url,
      retweetedFullText: twt.retweeted_status
        ? twt.retweeted_status.full_text
        : 'false',
      retweetedScreenName: twt.retweeted_status
        ? '@' + twt.retweeted_status.user.screen_name
        : 'false',
      retweetedUserName: twt.retweeted_status
        ? twt.retweeted_status.user.name
        : 'false'
    }));

    this.setState({ customTweets: customTweetData });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg={8}>
            {this.state.customTweets.map(twt => (
              <Card key={twt.tweetId}>
                <Card.Body>
                  <Media>
                    <Image src={twt.avatarUrl} roundedCircle />

                    <Media.Body>
                      {/* shows "user retweeted" if its a retweet */}
                      <span class="retweetStatus">
                        {twt.retweetedStatus === 'true' ? (
                          <>
                            {twt.userName + ' Retweeted'}
                            <br />
                          </>
                        ) : null}
                      </span>

                      {/* bold name */}
                      <span class="name">
                        {twt.retweetedStatus === 'true'
                          ? twt.retweetedUserName
                          : twt.userName}
                      </span>
                      {/* @ name */}
                      <span class="screenName">
                        {twt.retweetedStatus === 'true'
                          ? ' ' + twt.retweetedScreenName
                          : ' ' + twt.screenName}
                      </span>
                      <br />
                      {/* tweet text*/}
                      <span class="text">
                        {twt.retweetedStatus === 'true'
                          ? twt.retweetedFullText
                          : twt.tweetText
                              .replace(twt.urls[0], 'REPLACED')
                              .replace(twt.urls[1], 'REPLACED')}
                      </span>
                    </Media.Body>
                  </Media>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col lg={3}>Search, Trending, Who to follow</Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
