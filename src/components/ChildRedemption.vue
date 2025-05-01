<script setup lang="ts">
import { IpReturn } from 'vue-icons-plus/ip';

const undoRedemption = () => {
  console.log('undo redemption')
}
</script>

<template>
  <table class="redemption w-full border-2 border-blue md:text-2xl">
    <thead class="bg-blue text-white">
      <tr class="align-top">
        <th class="px-2">Prize</th>
        <th class="px-2">Approved By</th>
        <th class="px-2">Status</th>
        <th class="px-2">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="even:bg-amber-200">
        <td class="text-center">
            <p class="font-semibold">(prize name)</p>
            <p class="text-xs md:text-base">(date)</p>
        </td>
        <td class="text-center">
          <p>(name)</p>
          <p class="text-xs md:text-base">(date)</p>
        </td>
        <td class="text-center">(pending)</td>
        <td class="text-center">
          <a-popconfirm
            title="Are you sure to cancel the application"
            ok-text="Yes"
            cancel-text="No"
            @confirm="undoRedemption"
          >
            <button class="bg-orange text-white px-2 rounded-md text-base hover:text-blue cursor-pointer">
              <IpReturn class="inline-block" />
            </button>
          </a-popconfirm>
        </td>
      </tr>
      <tr>
        <td colspan="4" class="text-center">No redemption history yet</td>
      </tr>
    </tbody>
  </table>
</template>
