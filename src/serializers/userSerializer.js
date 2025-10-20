class UserSerializer {
  static single(user) {
    return {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      created_at: user.created_at
    };
  }

  static _buildPagination(pagination) {
    const { page, limit, total } = pagination;
    return {
      current_page: page,
      per_page: limit,
      total: total,
      total_pages: Math.ceil(total / limit)
    };
  }

  static collection(users, pagination) {
    return {
      users: users.map(user => this.single(user)),
      pagination: this._buildPagination(pagination),
    };
  }
}

export default UserSerializer