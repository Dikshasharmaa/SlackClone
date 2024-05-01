import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-profile.reducer';

export const UserProfileDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const userProfileEntity = useAppSelector(state => state.userProfile.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userProfileDetailsHeading">User Profile</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{userProfileEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{userProfileEntity.name}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{userProfileEntity.email}</dd>
          <dt>
            <span id="timezone">Timezone</span>
          </dt>
          <dd>{userProfileEntity.timezone}</dd>
          <dt>
            <span id="phone">Phone</span>
          </dt>
          <dd>{userProfileEntity.phone}</dd>
          <dt>Messages</dt>
          <dd>{userProfileEntity.messages ? userProfileEntity.messages.id : ''}</dd>
          <dt>Workspaces</dt>
          <dd>
            {userProfileEntity.workspaces
              ? userProfileEntity.workspaces.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {userProfileEntity.workspaces && i === userProfileEntity.workspaces.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Channels</dt>
          <dd>
            {userProfileEntity.channels
              ? userProfileEntity.channels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {userProfileEntity.channels && i === userProfileEntity.channels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/user-profile" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-profile/${userProfileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserProfileDetail;