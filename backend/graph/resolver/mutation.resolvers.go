package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"encoding/base64"
	"fmt"
	"math/rand"
	"time"

	"github.com/shion0625/portfolio-creater/backend/graph/generated"
	"github.com/shion0625/portfolio-creater/backend/graph/model"
	"github.com/shion0625/portfolio-creater/backend/service"
)

// UpdateProfile is the resolver for the updateProfile field.
func (r *mutationResolver) UpdateProfile(ctx context.Context, input model.UpdateProfileInput) (*model.User, error) {
	panic(fmt.Errorf("not implemented: UpdateProfile - updateProfile"))
}

// CreateWork is the resolver for the createWork field.
func (r *mutationResolver) CreateWork(ctx context.Context, input model.CreateWorkInput) (*model.Work, error) {
	id := fmt.Sprintf("work:%d", rand.Int())
	work := model.Work{
		ID:             base64.StdEncoding.EncodeToString([]byte(id)),
		Title:          input.Title,
		Summary:        input.Summary,
		ImageURL:       input.ImageURL,
		Duration:       input.Duration,
		NumberOfPeople: input.NumberOfPeople,
		Language:       input.Language,
		Role:           input.Role,
		URL:            input.URL,
		BriefStory:     input.BriefStory,
		CreatedAt:      service.Time2str(time.Now()),
		UpdatedAt:      service.Time2str(time.Now()),
		IsDelete:       false,
		UserID:         input.UserID,
	}
	r.DB.Debug().Create(&work)
	return &work, nil
}

// UpdateWork is the resolver for the updateWork field.
func (r *mutationResolver) UpdateWork(ctx context.Context, input model.UpdateWorkInput) (*model.Work, error) {
	work := model.Work{ID: input.ID}
	if input.Title == nil {
		input.Title = &work.Title
	}
	r.DB.Debug().First(&work)
	r.DB.Debug().Model(&work).Updates(model.Work{
		Title:          *input.Title,
		Summary:        input.Summary,
		ImageURL:       input.ImageURL,
		Duration:       input.Duration,
		NumberOfPeople: input.NumberOfPeople,
		Language:       input.Language,
		Role:           input.Role,
		URL:            input.URL,
		BriefStory:     input.BriefStory,
		UpdatedAt:      service.Time2str(time.Now()),
	})
	result := r.DB.Debug().Save(&work)
	return &work, result.Error
}

// DeleteWorks is the resolver for the deleteWorks field.
func (r *mutationResolver) DeleteWorks(ctx context.Context, id []*string) (*bool, error) {
	fmt.Println("delete")
	result := r.DB.Debug().Model(model.Work{}).Where("id IN ?", id).Updates(model.Work{IsDelete: true, UpdatedAt: service.Time2str(time.Now())})
	ans := false
	if result.Error == nil {
		ans = true
	}
	return &ans, result.Error
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, id string, email string) (interface{}, error) {
	return service.UserLogin(ctx, id, email)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
