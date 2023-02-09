package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"

	"github.com/shion0625/portfolio-creator/backend/domain"
	"github.com/shion0625/portfolio-creator/backend/graphql/generated"
)

// User is the resolver for the user field.
func (r *workResolver) User(ctx context.Context, obj *domain.Work) (*domain.User, error) {
	user, err := r.dataLoaderUseCase.UsersByIDs.Load(obj.UserID)
	if !errors.Is(err, nil) {
		return nil, fmt.Errorf("GetByIDLoad - usecase: %w", err)
	}

	return user, nil
}

// Work returns generated.WorkResolver implementation.
func (r *Resolver) Work() generated.WorkResolver { return &workResolver{r} }

type workResolver struct{ *Resolver }
