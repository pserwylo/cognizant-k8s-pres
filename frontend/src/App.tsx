import React, {useEffect, useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Card, CardBody, CardText, CardTitle, Container} from "reactstrap";

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
    <Container>
        <h1>C7t-K8s-Pres</h1>
        <Status status={status} apiEndpoint={apiEndpoint} />
        <p>
            <a href="#" onClick={() => onRefresh()}>Refresh</a>
        </p>
        {status !== 'down' && (
            staff === null
                ? <p>Loading staff...</p>
                : <StaffList staff={staff} />
        )}
    </Container>
  );
}

const Status: React.FC<{status: APIStatus, apiEndpoint: string}> = ({apiEndpoint, status}) => {
    const message = status === 'loading' ? 'Checking API status' : (status === 'up' ? 'API is up and running' : 'API is down')
    return <>
        <p>
            {message}:{' '}
            <a href={apiEndpoint}>{apiEndpoint}</a>
        </p>
    </>
}

const StaffList: React.FC<{staff: Staff[]}> = ({staff}) => {
    return <div style={{display: "flex", flexWrap: 'wrap'}}>
        {staff.map(s => <StaffCard key={s.name} staffMember={s} />)}
    </div>
}

const StaffCard: React.FC<{staffMember: Staff}> = ({staffMember}) =>
    <div style={{maxWidth: 300, alignItems: 'stretch', margin: 2}}>
        <Card>
            <CardBody>
                <CardTitle>{staffMember.name}</CardTitle>
                <CardText>Quote: "{staffMember.quote}"</CardText>
            </CardBody>
        </Card>
    </div>

export default App;
