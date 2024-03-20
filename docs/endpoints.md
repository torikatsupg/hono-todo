# Endpoints

## GET /todo
**request body**
```
(empty)
```

**response body**
```
{
    id: string
    title: string
    description: string
    status: "todo" | "doing" | "done",
    archived_at: "2024-03-20T10:35:40.136Z" | null
    created_at: "2024-03-20T10:35:40.136Z"
    updated_at: "2024-03-20T10:35:40.136Z"
}[],
```

## POST /todo
**request body**
```
{
    title: string
    description: string
}
```

**response body**
```
{
    id: string
    title: string
    description: string
    status: "todo",
    archived_at: null,
    created_at: "2024-03-20T10:35:40.136Z"
    updated_at: "2024-03-20T10:35:40.136Z"
}[],
```

## GET /todo/:id
**request body**
```
(empty)
```

**response body**
```
{
    id: string
    title: string
    description: string
    status: "todo" | "doing" | "done",
    archived_at: "2024-03-20T10:35:40.136Z" | null
    created_at: "2024-03-20T10:35:40.136Z"
    updated_at: "2024-03-20T10:35:40.136Z"
},
```


## PATCH /todo/:id/archive
**request body**
```
(empty)
```

**response body**
```
{}
```

## DELETE /todo/:id

**request body**
```
(empty)
```

**response body**
```
{}
```