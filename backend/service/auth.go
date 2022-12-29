package service

import (
	"context"
	// "fmt"
	// "github.com/shion0625/my-portfolio-front/backend/graph/model"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

// func UserRegister(ctx context.Context, input model.CreateUserInput) (interface{}, error) {
// 	// Check Email
// 	_, err := UserGetByEmail(ctx, input.Email)
// 	if err == nil {
// 		// if err != record not found
// 		if err != gorm.ErrRecordNotFound {
// 			return nil, err
// 		}
// 	}

// 	createdUser, err := UserCreate(ctx, input)
// 	if err != nil {
// 		return nil, err
// 	}

// 	token, err := JwtGenerate(ctx, createdUser.ID)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return map[string]interface{}{
// 		"token": token,
// 	}, nil
// }

func UserLogin(ctx context.Context, id string, email string) (interface{}, error) {
	getUser, err := UserGetByEmail(ctx, email)
	if err != nil {
		// if user not found
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email not found",
			}
		}
		return nil, err
	}


	token, err := JwtGenerate(ctx, getUser.ID)
	if err != nil {
		return nil, err
	}
	return map[string]interface{}{
		"token": token,
	}, nil
}
