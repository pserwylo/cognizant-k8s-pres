import React, {useEffect, useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Alert, Card, CardBody, CardGroup, CardText, CardTitle, Col, Container, Row} from "reactstrap";

type APIStatus = 'loading' | 'up' | 'down';
interface Staff {
    name: string,
    job: string,
    quote: string,
}

const App: React.FC<{apiEndpoint: string}> = ({apiEndpoint}) => {

  const [status, setStatus] = useState<APIStatus>('loading');
  const [staff, setStaff] = useState<Staff[]|null>(null);

  const fetchStatusAndStaff = () => {
    fetch(`${apiEndpoint}/api/health/status`)
        .then(res => res.json())
        .then(output => {
            setStatus(output?.status === 'UP' ? 'up' : 'down');
        }).catch(() => {
            setStatus('down');
        })

    fetch(`${apiEndpoint}/api/data/staff`)
        .then(res => res.json())
        .then(output => {
            setStaff(output);
        })
  }

    const onRefresh = () => {
      setStatus('loading');
      setStaff(null);
      fetchStatusAndStaff();
  }

  useEffect(() => {
      fetchStatusAndStaff();
  }, []);

  return (
    <Container style={{padding: '2rem'}}>
        <h1>c7t k8s presentation</h1>

        {status !== 'down' &&
            <p>
                <a href="#" onClick={() => onRefresh()}>Refresh</a>
            </p>}

        {status !== 'down' && (
            staff === null
                ? <Alert color="light">Loading staff...</Alert>
                : <StaffList staff={staff} />
        )}

        <Status status={status} apiEndpoint={apiEndpoint} />

    </Container>
  );
}

const Status: React.FC<{status: APIStatus, apiEndpoint: string}> = ({apiEndpoint, status}) => {
    const message = status === 'loading' ? 'Checking API status' : (status === 'up' ? 'API is up and running' : 'API is down')
    const colour = status === 'down' ? 'danger' : 'light'
    return <>
        <Alert color={colour}>
            {message}:{' '}
            <a href={apiEndpoint}>{apiEndpoint}</a>
        </Alert>
    </>
}

const StaffList: React.FC<{staff: Staff[]}> = ({staff}) => {
    return <Row>
        {staff.map(s => <StaffCard key={s.name} staffMember={s} />)}
    </Row>
}

const StaffCard: React.FC<{staffMember: Staff}> = ({staffMember}) =>
    <Col lg={3} md={4} sm={12}>
        <Card style={{marginBottom: '1rem'}}>
            <CardBody>
                <CardTitle tag="h5">{staffMember.name}</CardTitle>
                <CardText>Quote: "{staffMember.quote}"</CardText>
            </CardBody>
        </Card>
    </Col>

export default App;
