package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class ChannelAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertChannelAllPropertiesEquals(Channel expected, Channel actual) {
        assertChannelAutoGeneratedPropertiesEquals(expected, actual);
        assertChannelAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertChannelAllUpdatablePropertiesEquals(Channel expected, Channel actual) {
        assertChannelUpdatableFieldsEquals(expected, actual);
        assertChannelUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertChannelAutoGeneratedPropertiesEquals(Channel expected, Channel actual) {
        assertThat(expected)
            .as("Verify Channel auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertChannelUpdatableFieldsEquals(Channel expected, Channel actual) {
        assertThat(expected)
            .as("Verify Channel relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertChannelUpdatableRelationshipsEquals(Channel expected, Channel actual) {
        assertThat(expected)
            .as("Verify Channel relationships")
            .satisfies(e -> assertThat(e.getWorkspace()).as("check workspace").isEqualTo(actual.getWorkspace()))
            .satisfies(e -> assertThat(e.getMembers()).as("check members").isEqualTo(actual.getMembers()));
    }
}
