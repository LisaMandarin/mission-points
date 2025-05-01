<script setup lang="ts">
import { RiCheckFill, RiDeleteBin5Fill } from 'vue-icons-plus/ri';

const grantRedemption = () => {
  console.log('Redemption granted')
}

const deleteRedemption = () => {
  console.log('Redemption granted')
}
</script>

<template>
  <table class="w-full border-2 border-blue md:text-2xl">
    <thead class="bg-blue text-white">
      <tr class="align-top">
        <th class="px-2">Prize</th>
        <th class="px-2">Applied By</th>
        <th class="px-2">Status</th>
        <th class="px-2">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="even:bg-amber-200">
        <td class="text-center">(prize)</td>
        <td class="text-center">
          <p class="font-semibold">(person)</p>
          <p class="text-xs md:text-base">(date)</p>
        </td>
        <td class="text-center">(pending)</td>
        <td class="text-center space-x-4">
          <a-popconfirm
            title="Grant the redemption?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="grantRedemption"
            class="inline-block cursor-pointer text-green-600 hover:text-green-400"
          >
            <RiCheckFill />
          </a-popconfirm>
          <a-popconfirm
            title="Are you sure to delete this application?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deleteRedemption"
          >
            <RiDeleteBin5Fill class="inline-block cursor-pointer text-red-600 hover:text-red-400" />
          </a-popconfirm>
        </td>
      </tr>
      <tr>
        <td colspan="4" class="text-center">No redemption history yet</td>
      </tr>
    </tbody>
  </table>
</template>
