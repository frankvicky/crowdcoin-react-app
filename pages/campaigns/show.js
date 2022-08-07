import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../Components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../Components/ContributeForm";
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        
        const summary = await campaign.methods.getSummary().call();

        return {
            minimumContributor: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            address: props.query.address
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContributor,
            requestsCount,
            approversCount
        } = this.props;


        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign and can create requests tp withdraw money.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContributor,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A reuqest tries to withdraw money from the contract. Requests must be approve by approvers.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The Balance is how much money this campaign has left to spent.',
                style: { overflowWrap: 'break-word' }
            }
        ];

        return <Card.Group items={ items } />
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>      
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                        { this.renderCards() }
                      
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={ this.props.address }/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a className="item">
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link> 
                        </Grid.Column>
                    </Grid.Row>
                </Grid>          
            </Layout>
        );
    }
}

export default CampaignShow;