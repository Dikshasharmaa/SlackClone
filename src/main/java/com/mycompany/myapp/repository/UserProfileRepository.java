package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.UserProfile;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UserProfile entity.
 *
 * When extending this class, extend UserProfileRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface UserProfileRepository extends UserProfileRepositoryWithBagRelationships, JpaRepository<UserProfile, Long> {
    default Optional<UserProfile> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<UserProfile> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<UserProfile> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select userProfile from UserProfile userProfile left join fetch userProfile.user",
        countQuery = "select count(userProfile) from UserProfile userProfile"
    )
    Page<UserProfile> findAllWithToOneRelationships(Pageable pageable);

    @Query("select userProfile from UserProfile userProfile left join fetch userProfile.user")
    List<UserProfile> findAllWithToOneRelationships();

    @Query("select userProfile from UserProfile userProfile left join fetch userProfile.user where userProfile.id =:id")
    Optional<UserProfile> findOneWithToOneRelationships(@Param("id") Long id);

    Optional<UserProfile> findByUser(User user);

    //I created this
    @Query("select userProfile from UserProfile userProfile left join fetch userProfile.user where userProfile.user =:user")
    Optional<UserProfile> findOneWithToOneRelationshipsByUser(@Param("user") User user);

    default Optional<UserProfile> fetchBagRelationshipsByUser(Optional<UserProfile> userProfile) {
        return userProfile.flatMap(profile -> this.findByUser(profile.getUser()));
    }

    default Optional<UserProfile> findOneWithEagerRelationshipsByUser(User user) {
        return this.fetchBagRelationshipsByUser(this.findOneWithToOneRelationshipsByUser(user));
    }
}
