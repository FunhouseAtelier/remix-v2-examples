const usersById: {
  [key: string]: {
    name: string
    imageUrl: string
    messages: string[]
  }
} = {
  '1': {
    name: 'Bluebie B.',
    imageUrl: '/images/bluebie-b.jpg',
    messages: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsam non deserunt repudiandae, quia quaerat earum nulla magni optio recusandae id placeat accusantium culpa omnis consequuntur quidem libero autem alias!',
      'Voluptate, aperiam quas nobis dolores, earum, dolor impedit amet omnis nesciunt perferendis dolorem. Dignissimos magni reiciendis earum modi quaerat. Ducimus ratione debitis velit recusandae magnam, sed modi harum ex sint!',
      'Vero veniam ipsa a modi at veritatis non dolorum maiores. Quisquam est nemo omnis incidunt officia! Error veritatis quae alias, deleniti possimus odit dolores commodi a labore minima quisquam ut.',
      'Non sint et incidunt hic sit in qui, animi nihil totam laboriosam atque numquam distinctio cumque molestiae libero id ratione esse soluta modi voluptatem, illum magni. Animi saepe sit dolorem.',
    ],
  },
  '2': {
    name: 'Carrot McCaw',
    imageUrl: '/images/carrot-mccaw.jpg',
    messages: [
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quod, id eligendi dolor possimus, dicta, eveniet magnam voluptatibus enim ea officia alias! Provident vero nesciunt maiores deserunt iste nulla voluptatem.',
      'Quod laboriosam culpa sapiente voluptatem a iste voluptas qui fuga! Dignissimos consequuntur, tempora libero expedita reiciendis quibusdam sequi sit totam, repudiandae eum tenetur. A sequi similique molestias cumque necessitatibus veniam?',
      'Consequuntur incidunt, dolor ex quia excepturi animi expedita culpa dicta, hic facilis quod minus laborum modi temporibus corrupti sed aut ipsa. Accusantium sequi nesciunt eligendi laudantium fugit sunt doloremque quisquam.',
      'Eaque minima quod tenetur optio recusandae quo hic aliquam ducimus laudantium itaque nostrum temporibus voluptatem, et cum earum corrupti fuga accusamus cumque sint explicabo quos quam? Sunt est pariatur voluptatibus.',
    ],
  },
  '3': {
    name: 'Hoot Spotter',
    imageUrl: '/images/hoot-spotter.jpg',
    messages: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure dolorum pariatur quam a eius veritatis accusamus harum incidunt, mollitia doloribus delectus, atque laborum quis veniam autem ullam labore. Alias.',
      'Temporibus nulla delectus pariatur modi, iure ut aperiam! Doloremque, delectus? Est, tempore. Cumque voluptatem sequi dolore facere iusto! Reiciendis doloribus impedit nobis molestiae quaerat laboriosam suscipit, accusantium cumque quidem rem?',
      'Cupiditate excepturi eveniet, veritatis eius dignissimos doloremque cumque, explicabo error ullam, eos quae voluptate atque aliquid? Voluptates sed quaerat, vitae aliquid, iusto debitis eius quod officia corrupti quasi quo at.',
      'Obcaecati accusantium similique dignissimos incidunt totam autem ducimus molestiae eos aperiam sint ab doloribus nisi doloremque minima, iusto blanditiis quos sit amet impedit deleniti ipsa ipsum optio perferendis. Asperiores, impedit.',
    ],
  },
}

export async function getUser(userId: string) {
  return usersById[userId]
}
