package directives

import (
	"github.com/shion0625/portfolio-creator/backend/domain"
)

// type contextKey string

// const roleContextKey contextKey = "roleKey"

func HasRole(directive string, role []domain.Role) bool {
	for _, v := range role {
		v := v.String()
		if v == directive {
			return true
		}
	}

	return false
}
