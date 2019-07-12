
import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Grid, Button, Segment, Header, Image, Icon} from 'semantic-ui-react';
import Footer from './Footer';

const HomePage = () => {
    return (
        <div>
            <Grid>
                <Grid.Row style={{            
                    padding: '60px',             
                    backgroundImage: `url(${"/assets/img/head/home_placeholder.jpg"})`,
                    backgroundSize: 'cover',
                }}>
                    <Container text style={{
                                textAlign: 'center',
                                padding: '45px 5px',
                                margin: '35px 0px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}>
                        <Header
                            as='h1'
                            content='Imagine a Company'
                            inverted
                            style={{
                                fontSize: '4em',
                                padding: '10px 5px',
                                fontWeight: 'normal',
                                marginBottom: 0,
                            }} />
                        <Header
                            as='h2'
                            content='Do whatever you want when you want to.'
                            inverted
                            style={{
                                fontSize: '1.7em',
                                fontWeight: 'normal',
                            }}
                            />
                        <Button as={Link} to="/events" primary size='huge'>
                            Get Started
                        <Icon name='right arrow' />
                        </Button>
                    </Container>
                    
                </Grid.Row>
            </Grid>

            <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            We Help Companies and Companions
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                        We can give your company superpowers to do things that they never thought possible.
                        Let us delight your customers and empower your needs... through pure data analytics.
                        </p>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        We Make Bananas That Can Dance
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                        Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                        bioengineered.
                        </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <Image bordered rounded size='large' src='/assets/img/head/home_placeholder.jpg' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Segment>
            <Footer />
        </div>
    )
}

export default HomePage;