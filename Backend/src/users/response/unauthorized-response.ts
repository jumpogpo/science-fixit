export const unauthorizedResponse = {
  status: 401,
  description: 'Unauthorized',
  content: {
    'application/json': {
      examples: {
        permissionDenied: {
          summary: 'Permission Denied',
          value: {
            message: "You don't have permission",
            error: 'Unauthorized',
            statusCode: 401,
          },
        },
        unauthorized: {
          summary: 'Unauthorized',
          value: {
            message: 'Unauthorized',
            statusCode: 401,
          },
        },
      },
    },
  },
};
